import { AccessDeniedError } from "@/domain/errors/access-denied-error"
import { useLogout } from "./use-logout"

type CallBackType = (error: Error) => void
type ResultType = CallBackType
export const useErrorHandler = (callback: CallBackType): ResultType => {
    const logout = useLogout()
    return (error: Error): void => {
        if (error instanceof AccessDeniedError) {
            logout()
        } else {
            callback(error)
        }
    }


}