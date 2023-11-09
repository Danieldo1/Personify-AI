import SubButton from "@/components/SubButton"
import { checkSubscription } from "@/lib/subscription"
import { Settings } from "lucide-react"


const SettingsPage = async() => {
    const isPro = await checkSubscription()
  return (
    <div className="h-full mx-4">
        <div className="flex flex-1 justify-start items-start flex-row">

        <h3 className="text-lg font-medium my-4 " >Settings</h3>
        </div>

        <div className="text-muted-foreground text-sm mb-4">
            {isPro ? "Your subscription is active" : "Your subscription is not active"}
        </div>
        <SubButton isPro={isPro}  />
    </div>
  )
}

export default SettingsPage