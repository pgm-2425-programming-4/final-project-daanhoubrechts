import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { PaginatedBacklog } from "./paginated-backlog/PaginatedBacklog";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ margin: "2rem" }}>
        <PaginatedBacklog />
      </div>
    </QueryClientProvider>
  );
}

export default App;
