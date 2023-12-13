import Search, { SearchProps } from "antd/es/input/Search";

export default () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    if (value !== "") {
      window.location.href = `/search/${value}`;
    }
  };

  return (
    <>
      <Search
        placeholder="Введите запрос"
        size="large"
        allowClear
        onSearch={onSearch}
        style={{ maxWidth: 500 }}
      />
    </>
  );
};
