import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  btnStyle?: 'outline-blue' | 'outline-red';
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  linkTo?: string;
  fullWidth?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  type = 'button',
  text,
  size = 'sm',
  btnStyle,
  onClick,
  fullWidth,
  isLoading,
  disabled,
  children,
  linkTo,
}) => {
  const btnClassnames = classNames(
    'app-btn block px-7 text-white text-[14px] rounded-[10px]',
    {
      'h-[32px]': size === 'sm',
      'h-[44px]': size === 'md',
      'h-[60px] text-[18px] font-bold': size === 'lg',
      'btn-outline-blue': btnStyle === 'outline-blue',
      'btn-outline-red': btnStyle === 'outline-red',
      'w-full': fullWidth,
    }
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={`${btnClassnames} flex justify-center items-center `}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={btnClassnames}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div
          className={classNames('flex justify-center items-center absolute', {
            'left-2/4': fullWidth,
          })}
        >
          <FadeLoader
            color="currentColor"
            height={6}
            margin={-10}
            width={1.25}
          />
        </div>
      ) : (
        children || text
      )}
    </button>
  );
};

export default CustomButton;
