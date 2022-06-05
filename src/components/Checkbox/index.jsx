import StyledCheckbox from "@/components/Checkbox/index.styled";

function Checkbox({ onChange, checked }) {
  return (
    <StyledCheckbox
      className="checkbox"
      name="checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
}

export default Checkbox;
