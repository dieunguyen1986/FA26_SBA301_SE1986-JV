import { Pagination } from "react-bootstrap";

const CustomPagination = ({ active = 1, totalPages, onPageChange }) => {
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
};

export default CustomPagination;
