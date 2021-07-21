import Layout, { Content } from "antd/lib/layout/layout";
import styled from "styled-components";
import TaskboardView from "./components/TaskboardView";

const StyledLayout = styled(Layout)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledContent = styled(Content)`
  background-color: #edeff3;
`;

function App() {
  return (
    <StyledLayout>
      <StyledContent>
        <TaskboardView />
      </StyledContent>
    </StyledLayout>
  );
}

export default App;
