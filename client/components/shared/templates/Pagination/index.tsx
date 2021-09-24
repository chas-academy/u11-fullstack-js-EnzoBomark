interface Props {
  currentPage: number;
  nextPages: number | undefined;
  prevPages: number | undefined;
}

const Pagination: React.FC<Props> = (props: Props) => {
  const { nextPages, currentPage, prevPages } = props;

  const total = prevPages + nextPages + 1;

  return (
    <>
      <div>tot {total}</div>
      <div>prev {props.prevPages}</div>
      <div>curr {props.currentPage}</div>
      <div>next {props.nextPages}</div>

      <button></button>
      <button></button>
      <button>{currentPage}</button>
      <button></button>
      <button></button>
    </>
  );
};

export default Pagination;
