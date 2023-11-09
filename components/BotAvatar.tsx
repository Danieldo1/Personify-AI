import { Avatar, AvatarImage } from "./ui/avatar"



interface BotAvatarProps {
    src: string
}
const BotAvatar = ({src}: BotAvatarProps) => {
  return (
    <Avatar className="w-12 h-12">
        <AvatarImage src={src}/>
    </Avatar>
  )
}

export default BotAvatar