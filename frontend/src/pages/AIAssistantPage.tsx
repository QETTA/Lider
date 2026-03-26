import React, { useState, useRef, useEffect } from 'react';
import { theme } from '../styles/designTokens';
import { AIChatBubble } from '../components/ai/AIChatBubble';
import { AIChatInput } from '../components/ai/AIChatInput';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Array<{ source: string; text: string }>;
  isTyping?: boolean;
}

interface SuggestedAction {
  label: string;
  prompt: string;
}

const SUGGESTED_ACTIONS: SuggestedAction[] = [
  { label: '📊 주간 보고서 생성', prompt: '이번 주 케어 기록을 바탕으로 보호자용 주간 보고서를 작성해주세요' },
  { label: '🔍 수급자 검색', prompt: '등급이 2등급이고 방문요양 서비스를 받는 수급자를 찾아줘' },
  { label: '📝 상담 일지 초안', prompt: '오늘 상담 내용을 바탕으로 상담 일지 초안을 작성해주세요' },
  { label: '📄 문서 분석', prompt: '업로드된 평가표에서 중요 정보를 추출하고 요약해주세요' },
];

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `sess_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string, attachments?: File[]) => {
    // 사용자 메시지 추가
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // 타이핑 메시지 추가
    const typingMessage: Message = {
      id: `typing_${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: '',
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // API 호출
      const response = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content }],
          context: {
            route: '/ai-assistant',
            centerName: 'LIDER 돌봄센터',
            mode: 'assistant',
          },
          sessionId,
        }),
      });

      const data = await response.json();

      // 타이핑 메시지 제거하고 실제 응답 추가
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.id !== typingMessage.id);
        return [
          ...withoutTyping,
          {
            id: `msg_${Date.now()}_ai`,
            role: 'assistant',
            content: data.data?.reply || '응답을 생성할 수 없습니다.',
            timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            citations: data.data?.citations,
          },
        ];
      });
    } catch (err) {
      // 에러 메시지
      setMessages((prev) => {
        const withoutTyping = prev.filter((m) => m.id !== typingMessage.id);
        return [
          ...withoutTyping,
          {
            id: `msg_${Date.now()}_error`,
            role: 'assistant',
            content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedAction = (action: SuggestedAction) => {
    handleSend(action.prompt);
  };

  const handleFileUpload = async (files: File[]) => {
    // 파일 분석 API 호출
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('prompt', '이 파일을 분석하고 요약해주세요');

    try {
      const response = await fetch('/api/v1/ai/analyze-file', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now()}_file`,
          role: 'assistant',
          content: data.data?.reply || '파일 분석이 완료되었습니다.',
          timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('File analysis failed:', err);
    }
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: theme.colors.gray[50],
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
    backgroundColor: 'white',
    borderBottom: `1px solid ${theme.colors.gray[200]}`,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray[900],
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
  };

  const badgeStyles: React.CSSProperties = {
    padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.secondary[700],
    backgroundColor: theme.colors.secondary[100],
    borderRadius: theme.borderRadius.full,
  };

  const messagesContainerStyles: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing[6],
  };

  const emptyStateStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: theme.spacing[6],
  };

  const suggestedActionsStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing[3],
    maxWidth: '600px',
    width: '100%',
  };

  return (
    <div style={containerStyles}>
      <header style={headerStyles}>
        <div style={titleStyles}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: theme.borderRadius.lg,
              background: theme.colors.ai.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          LIDER AI 어시스턴트
          <span style={badgeStyles}>Beta</span>
        </div>
        <Button variant="ghost" size="sm" colorScheme="gray">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </Button>
      </header>

      <div style={messagesContainerStyles}>
        {messages.length === 0 ? (
          <div style={emptyStateStyles}>
            <Card variant="glass" padding="lg" style={{ maxWidth: '400px', textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: theme.borderRadius['2xl'],
                  background: theme.colors.ai.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  marginBottom: theme.spacing[4],
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h2
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.gray[900],
                  marginBottom: theme.spacing[2],
                }}
              >
                무엇을 도와드릴까요?
              </h2>
              <p style={{ color: theme.colors.gray[500], marginBottom: theme.spacing[6] }}>
                장기요양 업무, 문서 분석, 상담 일지 작성 등<br />
                AI가 다양한 업무를 지원합니다.
              </p>
            </Card>

            <div style={suggestedActionsStyles}>
              {SUGGESTED_ACTIONS.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  colorScheme="gray"
                  size="lg"
                  onClick={() => handleSuggestedAction(action)}
                  style={{ justifyContent: 'flex-start', textAlign: 'left', height: 'auto', padding: theme.spacing[4] }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <AIChatBubble
                key={message.id}
                role={message.role}
                content={message.content}
                isTyping={message.isTyping}
                timestamp={message.timestamp}
                citations={message.citations}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <AIChatInput
        onSend={handleSend}
        onFileUpload={handleFileUpload}
        isLoading={isLoading}
        suggestions={SUGGESTED_ACTIONS.map((a) => a.prompt)}
      />
    </div>
  );
};

export default AIAssistantPage;
