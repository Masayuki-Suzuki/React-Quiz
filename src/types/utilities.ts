export type Nullable<T> = T | null
export type VoidFunction = () => void
export type PromiseVoidFunction = () => Promise<void>

export type OnlyChildrenProps = {
    children: Nullable<JSX.Element | JSX.Element[]>
}
