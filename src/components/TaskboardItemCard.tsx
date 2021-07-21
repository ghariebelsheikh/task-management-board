import { Button, Card, Modal, Typography, Dropdown, Menu } from "antd";
import { TaskboardItem, TaskboardItemStatus } from "./types";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface StyledCardProps {
  $isDragging: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ $isDragging }) => ($isDragging ? "#fafafa" : "#fff")};
`;

const TaskboardItemCardTitle = styled(Typography.Title)`
  white-space: pre-wrap;
  margin-right: 0.25rem;
`;

const DeleteMenuItem = styled(Menu.Item)`
  color: #f5222d;
`;

export interface TaskboardItemCardProps {
  item: TaskboardItem;
  isDragging: boolean;
  status: TaskboardItemStatus;
  onEdit: (itemToEdit: TaskboardItem) => void;
  onDelete: (args: {
    status: TaskboardItemStatus;
    itemToDelete: TaskboardItem;
  }) => void;
}

function TaskboardItemCard({
  item,
  status,
  isDragging,
  onEdit,
  onDelete,
}: TaskboardItemCardProps) {
  return (
    <StyledCard
      $isDragging={isDragging}
      size="small"
      title={
        <span>
          <TaskboardItemCardTitle level={5} ellipsis={{ rows: 2 }}>
            {item.title}
          </TaskboardItemCardTitle>
        </span>
      }
      extra={
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="0"
                icon={<EditOutlined />}
                onClick={() => onEdit(item)}
              >
                Edit
              </Menu.Item>
              <DeleteMenuItem
                key="1"
                icon={<DeleteOutlined />}
                onClick={() =>
                  Modal.confirm({
                    title: "Delete?",
                    content: `Are you sure to delete "${item.title}"?`,
                    onOk: () =>
                      onDelete({
                        status,
                        itemToDelete: item,
                      }),
                  })
                }
              >
                Delete
              </DeleteMenuItem>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button size="small" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
        {item.description}
      </Typography.Paragraph>
    </StyledCard>
  );
}

export default TaskboardItemCard;
