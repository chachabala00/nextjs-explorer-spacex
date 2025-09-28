export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
    return new Date(dateString).toLocaleDateString('en-US', options ?? {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
}
