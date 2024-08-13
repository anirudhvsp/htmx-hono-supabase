interface Props {
    id: string;
    email: string;
    name: string;
    profile_picture_url: string;
  }
  
  export default function Row({ id, email, name, profile_picture_url }: Props) {
    return (
      <tr
        className="hover:bg-gray-100 mb-4 cursor-pointer"
        hx-get={`/chat/user/${id}`}
        hx-target="#chat-window"
        hx-swap="innerHTML"
      >
        <td className="p-4">
          <img src={profile_picture_url} alt={name} className="w-12 h-12 rounded-full" />
        </td>
        <td className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{email}</p>
        </td>
      </tr>
    );
  }
  