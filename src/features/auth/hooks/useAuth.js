import {useMutation} from "@tanstack/react-query"
import { loginUser, signupUser } from "../../../api/auth.api.js"



export function useLogin() {
    return useMutation({
        mutationFn: (payload) => loginUser(payload),
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken)
        }
    })
}
export function useSignup() {
    return useMutation({
        mutationFn: (payload) => signupUser(payload)
    })
}