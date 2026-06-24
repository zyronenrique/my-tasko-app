
const columns = [
    "Title",
    "Description",
    "Remark",
    "Status",
    "DueDate",
    "Created At",
    "Updated At",
    "",
];

const TasksTableHeader = () => (
    <thead className="[&_tr]:border-b sticky top-0 z-10 bg-white">
        <tr className="border-b border-gray-200 text-left font-medium">
            {columns.map((col) => (
                <th
                    key={col}
                    scope="col"
                    className="p-4 text-left font-medium tracking-wider"
                >
                    {col}
                </th>
            ))}
        </tr>
    </thead>
);

export default TasksTableHeader;
