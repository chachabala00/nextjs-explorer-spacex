# SpaceX Explorer (Next.js)

A modern, interactive web application to explore SpaceX launches, built with Next.js, TypeScript, and a clean component-driven architecture.

---

## ● How to Run / Build

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Run the development server**
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 3. **Build for production**
```bash
npm run build
npm start
```

### 4. **Run tests**
```bash
npm run test
```

---

## ● Decisions

### State Management
- **React useState/useReducer**: Local UI state is managed with React's built-in hooks for simplicity and performance.
- **No external state libraries**: The app is small/medium scale, so no Redux, Zustand, or Context API was needed.

### Data Fetching
- **Axios**: Used for HTTP requests to the SpaceX API, wrapped in a custom hook (`useLaunches`, `useLaunchDetails`).
- **SWR-like pattern**: Custom hooks handle caching, loading, and error states, inspired by SWR/React Query but without extra dependencies.
- **Debounced search**: `useDebounce` hook optimizes search/filter input.

### Trade-offs
- **No global state**: Simpler, but would need refactoring for cross-component state sharing at scale.
- **No SSR/ISR**: All data fetching is client-side for simplicity; could be optimized for SEO/performance with Next.js data fetching methods.
- **Minimal dependencies**: Fewer libraries means less bloat, but also less out-of-the-box functionality.

---

## ● What I'd Do Next (with More Time)

- **Implement SSR/ISR**: Use Next.js `getServerSideProps` or `getStaticProps` for better SEO and faster initial loads.
- **Add global state**: Introduce Context API or Zustand for favorites, filters, and user preferences.
- **Improve test coverage**: Add more integration and edge-case tests.
- **Error monitoring**: Integrate Sentry or similar for production error tracking.
- **PWA support**: Enable offline access and installability.

---

**Built by chagana**
