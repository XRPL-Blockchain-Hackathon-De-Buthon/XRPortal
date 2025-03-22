import styled from '@emotion/styled'

export const MarkdownPreviewContainer = styled.div`
  width: 100%;
  height: ${props => props.height ? `${props.height}px` : 'auto'};
  padding: 12px; 
  background-color: ${props => props.isBackground ? '#333333' : 'transparent'};
  border: ${props => props.isBackground ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  border-radius: 8px;
  color: #DDDDDD;
`;

