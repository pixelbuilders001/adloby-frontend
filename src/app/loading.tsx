export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
            <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 dark:border-zinc-800 dark:border-t-blue-500" />
                <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Loading resources...</p>
            </div>
        </div>
    );
}
