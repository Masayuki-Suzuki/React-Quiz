import { OnlyChildrenProps } from '../types/utilities'

const Main = ({ children }: OnlyChildrenProps) => {
    return <main className="main">{children}</main>
}

export default Main
