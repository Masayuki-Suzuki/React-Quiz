type ButtonPropsType = {
    action: () => void
    children: JSX.Element | string
    className?: string
}

const Button = ({ action, children, className = 'btn btn-ui' }: ButtonPropsType) => (
    <button className={className} onClick={action}>
        {children}
    </button>
)

export default Button
