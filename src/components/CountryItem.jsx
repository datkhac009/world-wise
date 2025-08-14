import styles from "./CountryItem.module.css";
const flagUrl = (input = {}) => {
  const s = String(input || "");
  // emoji của API đang là chữ hoa về viết thường
  // đổi về country code 2 ký tự, viết thường
  const code = /^[A-Za-z]{2,3}$/.test(s) //{2,3} là phạm vi 2 hoăc 3 ký tự VD:"VN","USA"
    ? s.toLowerCase()
    : String.fromCharCode(
        ...[...s].slice(0, 2).map((ch) => (ch.codePointAt(0) ?? 0) - 127397)
      ).toLowerCase();

  if (code) return `https://flagcdn.com/${code}.svg`; // ✅ luôn tồn tại
};
function CountryItem({ countrys }) {
  console.log(countrys);
  const { emoji, country: name } = countrys;
  return (
    <li className={styles.countryItem}>
      <span>
        <img 
        src={flagUrl(emoji)} 
        alt={flagUrl} 
          width="30"
          height="20"
        />
      </span>
      <span>{name}</span>
    </li>
  );
}

export default CountryItem;
