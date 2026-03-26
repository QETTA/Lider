import React, { useState, useRef, useCallback } from 'react';
import { theme } from '../../styles/designTokens';

interface AIChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  onFileUpload?: (files: File[]) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  allowAttachments?: boolean;
  suggestions?: string[];
}

export const AIChatInput: React.FC<AIChatInputProps> = ({
  onSend,
  onFileUpload,
  placeholder = '메시지를 입력하세요...',
  disabled,
  isLoading,
  allowAttachments = true,
  suggestions = [],
}) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(() => {
    if (!message.trim() && files.length === 0) return;

    onSend(message.trim(), files.length > 0 ? files : undefined);
    setMessage('');
    setFiles([]);
    setShowSuggestions(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, [message, files, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;

    // Show suggestions
    if (e.target.value.length > 0 && suggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
    onFileUpload?.(selectedFiles);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const containerStyles: React.CSSProperties = {
    borderTop: `1px solid ${theme.colors.gray[200]}`,
    backgroundColor: 'white',
    padding: theme.spacing[4],
  };

  const inputContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing[3],
    alignItems: 'flex-end',
    border: `1.5px solid ${theme.colors.gray[300]}`,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing[3],
    backgroundColor: theme.colors.gray[50],
    transition: `border-color ${theme.transitions.duration[200]}`,
  };

  const textareaStyles: React.CSSProperties = {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    resize: 'none',
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.normal,
    minHeight: '24px',
    maxHeight: '200px',
    outline: 'none',
  };

  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: theme.borderRadius.lg,
    border: 'none',
    backgroundColor: theme.colors.primary[600],
    color: 'white',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading || (!message.trim() && files.length === 0) ? 0.5 : 1,
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const fileButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: theme.borderRadius.lg,
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.colors.gray[500],
    cursor: 'pointer',
    transition: `all ${theme.transitions.duration[200]}`,
  };

  const fileListStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    marginTop: files.length > 0 ? theme.spacing[3] : 0,
  };

  const fileItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    padding: `${theme.spacing[1.5]} ${theme.spacing[3]}`,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary[700],
  };

  const suggestionsStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    marginBottom: theme.spacing[2],
    backgroundColor: 'white',
    border: `1px solid ${theme.colors.gray[200]}`,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.lg,
    padding: theme.spacing[2],
    zIndex: 50,
  };

  return (
    <div style={{ position: 'relative' }}>
      {showSuggestions && suggestions.length > 0 && (
        <div style={suggestionsStyles}>
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
                borderRadius: theme.borderRadius.md,
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.gray[700],
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => {
                setMessage(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div style={containerStyles}>
        <div
          style={inputContainerStyles}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = theme.colors.primary[500];
            e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.primary[100]}`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = theme.colors.gray[300];
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {allowAttachments && (
            <button
              style={fileButtonStyles}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.colors.gray[700];
                e.currentTarget.style.backgroundColor = theme.colors.gray[100];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.colors.gray[500];
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
          )}

          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            style={textareaStyles}
            rows={1}
          />

          <button
            style={buttonStyles}
            onClick={handleSend}
            disabled={disabled || isLoading || (!message.trim() && files.length === 0)}
            onMouseEnter={(e) => {
              if (!disabled && !isLoading && (message.trim() || files.length > 0)) {
                e.currentTarget.style.backgroundColor = theme.colors.primary[700];
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.primary[600];
            }}
          >
            {isLoading ? (
              <span
                style={{
                  display: 'inline-block',
                  width: '18px',
                  height: '18px',
                  border: '2px solid white',
                  borderRightColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            )}
          </button>
        </div>

        {files.length > 0 && (
          <div style={fileListStyles}>
            {files.map((file, idx) => (
              <div key={idx} style={fileItemStyles}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                  <path d="M13 3v7h7" />
                </svg>
                <span style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file.name}
                </span>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: theme.colors.primary[600],
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  onClick={() => removeFile(idx)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AIChatInput;
