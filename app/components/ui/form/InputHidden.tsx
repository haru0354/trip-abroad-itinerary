type InputProps = {
  name: string;
  value: number | string | undefined;
  register: any;
};

const InputHidden: React.FC<InputProps> = ({ name, value, register }) => {
  return <input type="hidden" value={value} name={name} {...register(name)} />;
};

export default InputHidden;
