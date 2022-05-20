import { useState } from "react";


export function useLoadingTeste() {
    const [loadingTest, setLoadingTest] = useState(false);

    return {
        loadingTest,
        setLoadingTest
    }
} 