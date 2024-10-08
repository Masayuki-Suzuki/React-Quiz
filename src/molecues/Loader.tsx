type LoaderProps = {
    text?: string
}

export default function Loader({ text = 'Loading questions...' }: LoaderProps) {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <p>{text}</p>
        </div>
    )
}
