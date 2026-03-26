import React from 'react';
import { theme } from '../../styles/designTokens';

interface AIChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
  timestamp?: string;
  citations?: Array<{ source: string; text: string }>;
  actions?: Array<{ label: string; onClick: () => void }>;
}

export const AIChatBubble: React.FC<AIChatBubbleProps> = ({
  role,
  content,
  isTyping,
  timestamp,
  citations,
  actions,
}) => {
  const isUser = role === 'user';

  const bubbleStyles: React.CSSProperties = {
    maxWidth: '80%',
    padding: theme.spacing[4],
    borderRadius: isUser
      ? theme.componentTokens.ai.bubble.user.borderRadius
      : theme.componentTokens.ai.bubble.assistant.borderRadius,
    backgroundColor: isUser
      ? theme.componentTokens.ai.bubble.user.bg
      : theme.componentTokens.ai.bubble.assistant.bg,
    color: isUser
      ? theme.componentTokens.ai.bubble.user.color
      : theme.componentTokens.ai.bubble.assistant.color,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.relaxed,
    wordBreak: 'break-word',
    animation: 'slideUp 0.3s ease-out',
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    marginBottom: theme.spacing[4],
  };

  const typingStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing[1],
    alignItems: 'center',
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
  };

  const dotStyles: React.CSSProperties = {
    width: theme.componentTokens.ai.typingIndicator.dotSize,
    height: theme.componentTokens.ai.typingIndicator.dotSize,
    backgroundColor: theme.componentTokens.ai.typingIndicator.dotColor,
    borderRadius: '50%',
    animation: `typing ${theme.componentTokens.ai.typingIndicator.animationDuration} infinite`,
  };

  const citationStyles: React.CSSProperties = {
    marginTop: theme.spacing[3],
    paddingTop: theme.spacing[3],
    borderTop: `1px solid ${isUser ? 'rgba(255,255,255,0.2)' : theme.colors.gray[200]}`,
    fontSize: theme.typography.fontSize.sm,
  };

  const actionStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing[2],
    marginTop: theme.spacing[3],
    flexWrap: 'wrap',
  };

  const actionButtonStyles: React.CSSProperties = {
    padding: `${theme.spacing[1.5]} ${theme.spacing[3]}`,
    fontSize: theme.typography.fontSize.sm,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${isUser ? 'rgba(255,255,255,0.3)' : theme.colors.primary[300]}`,
    backgroundColor: isUser ? 'rgba(255,255,255,0.1)' : theme.colors.primary[50],
    color: isUser ? 'white' : theme.colors.primary[700],
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration[150]}`,
  };

  return (
    <div style={containerStyles}>
      <div style={bubbleStyles}>
        {isTyping ? (
          <div style={typingStyles}>
            <span style={{ ...dotStyles, animationDelay: '0s' }} />
            <span style={{ ...dotStyles, animationDelay: '0.2s' }} />
            <span style={{ ...dotStyles, animationDelay: '0.4s' }} />
          </div>
        ) : (
          <>
            <div>{content}</div>

            {citations && citations.length > 0 && (
              <div style={citationStyles}>
                <div style={{ fontWeight: 600, marginBottom: theme.spacing[1] }}>
                  출처
                </div>
                {citations.map((citation, idx) => (
                  <div key={idx} style={{ marginBottom: theme.spacing[1] }}>
                    <span style={{ color: isUser ? 'rgba(255,255,255,0.7)' : theme.colors.gray[500] }}>
                      [{idx + 1}] {citation.source}:
                    </span>{' '}
                    {citation.text}
                  </div>
                ))}
              </div>
            )}

            {actions && actions.length > 0 && (
              <div style={actionStyles}>
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    style={actionButtonStyles}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isUser
                        ? 'rgba(255,255,255,0.2)'
                        : theme.colors.primary[100];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isUser
                        ? 'rgba(255,255,255,0.1)'
                        : theme.colors.primary[50];
                    }}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {timestamp && (
              <div
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  marginTop: theme.spacing[2],
                  opacity: 0.7,
                  textAlign: isUser ? 'right' : 'left',
                }}
              >
                {timestamp}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default AIChatBubble;
