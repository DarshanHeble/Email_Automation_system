import { useParams } from "react-router-dom";
import { type EmailTask } from "../Types";

function EmailTask() {
  const { taskId } = useParams<EmailTask["id"]>();
  return <div>Task ID: {taskId}</div>;
}

export default EmailTask;
