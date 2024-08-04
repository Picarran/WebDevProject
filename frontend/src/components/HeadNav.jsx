import { useNavigate } from "react-router-dom";

const HeadNav = () => {
  let navigate = useNavigate();

  return (
    <div>
      <button>主菜单</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        注销
      </button>
      <button>{localStorage.getItem('user')}</button>
    </div>
  );
};

export default HeadNav;
