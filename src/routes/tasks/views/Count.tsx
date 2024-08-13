interface Props {
    title: string;
    count: number;
  }

export default function Count({ title, count }: Props) {
    return (
      <div className="flex items-center space-x-4 mb-4">
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <span className="text-xl font-bold text-gray-900">{count}</span>
      </div>
    );
  }
  