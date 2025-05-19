import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { PaginatedBacklogList } from "./paginated-backlog/paginated-backlog-list";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ margin: "2rem" }}>
        <PaginatedBacklogList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
