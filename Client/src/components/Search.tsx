import Search, { SearchProps } from "antd/es/input/Search";

export default () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <>
      <Search
        placeholder="Введите запрос"
        enterButton
        size="large"
        onSearch={onSearch}
        style={{maxWidth: 500}}
      />
    </>
  );
};
