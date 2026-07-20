import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            retry: 1,
            staleTime: 1000 * 60,
        },
    },
})

export default queryClient
