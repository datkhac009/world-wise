import styles from './Button.module.css'

function Button({ children, onClick, type = "button" }) {
  const htmlTypes = ["button", "submit", "reset"];
  const isHtmlType = htmlTypes.includes(type);

  // HTML type:
  const htmlType = isHtmlType
    ? type
    : type === "primary"
      ? "submit"
      : "button";

  // CSS class (chỉ thêm nếu có class tương ứng trong CSS)
  const variantClass = styles[type] ?? "";

  return (
    <button
      type={htmlType}
      className={`${styles.btn} ${variantClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button
