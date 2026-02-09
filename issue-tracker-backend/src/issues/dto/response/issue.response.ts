export class IssueResponse {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}
