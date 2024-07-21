const Main = () => {
  return (
    <>
      <div class="h-full flex flex-row justify-between space-x-3 overflow-x-auto">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </>
  );
};
export default Main;

const Item = () => {
  return (
    <>
      <div class="flex-none w-64 h-full p-3">
        <div class="bg-white rounded-xl p-4">item</div>
      </div>
    </>
  );
};
