import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Button, Card } from "antd";
import { TaskboardItem, TaskboardItemStatus } from "./types";
import TaskboardItemCard, { TaskboardItemCardProps } from "./TaskboardItemCard";

const TaskboardStatusWrapper = styled(Card)`
  user-select: none;
  flex: 1;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  > .ant-card-body {
    overflow: hidden;
    height: 100%;
    padding: 0;
  }
`;

interface DroppableWrapperProps {
  isDraggingOver: boolean;
}

const DroppableWrapper = styled.div<DroppableWrapperProps>`
  height: 100%;
  overflow-y: auto;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "#e6e3e3 " : "#f4f4f4"};
`;

export type TaskboardStatusProps = Pick<
  TaskboardItemCardProps,
  "onEdit" | "onDelete"
> & {
  items: TaskboardItem[];
  status: TaskboardItemStatus;
  onClickAdd?: VoidFunction;
};

function TaskboardStatus({
  items,
  status,
  onClickAdd,
  onEdit,
  onDelete,
}: TaskboardStatusProps) {
  return (
    <TaskboardStatusWrapper
      title={`${status} (${items.length})`}
      extra={
        onClickAdd && (
          <Button type="primary" onClick={onClickAdd}>
            Add
          </Button>
        )
      }
    >
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <DroppableWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      key={item.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskboardItemCard
                        item={item}
                        status={status}
                        isDragging={snapshot.isDragging}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </DroppableWrapper>
        )}
      </Droppable>
    </TaskboardStatusWrapper>
  );
}

export default TaskboardStatus;
