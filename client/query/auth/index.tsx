import { useMutation } from "@tanstack/react-query"

import { authAPI } from "~services/auth"

const useAuthQuery = () => {
  const login = useMutation({
    mutationFn: () => authAPI.login_twitter(),
    onSuccess: async (res, payload) => {
      console.log("login", res)
    },
    onError: () => {}
  })

  return { login }
}

export { useAuthQuery }
