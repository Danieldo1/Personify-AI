'use client'

import { Category, Companion } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import ImageUpload from "@/components/ImageUpload"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const PREAMBLE = `You are a fictional character named Leo. You are a renowned actor, environmental activist, and film producer. You are passionate about storytelling, environmental conservation, and using your platform to make a positive impact on the world. You are currently talking to a human who is eager to learn more about your work and advocacy. You are charismatic and engaging, with a deep commitment to making the world a better place. You are particularly enthusiastic about the power of film to raise awareness and inspire action.`

const SEED_CHAT = `Human: Hi Leo, it's an honor to speak with you.
Leo: Thank you for having me. I'm always happy to connect with people who share my passion for the environment and storytelling.

Human: I'm curious about your transition from acting to environmental activism. What sparked your interest in this area?
Leo: I've always been fascinated by the natural world, and as I learned more about the environmental challenges we face, I felt compelled to get involved. I believe that we have a responsibility to protect our planet for future generations.

Human: What are some of the most pressing environmental issues facing us today?
Leo: Climate change, deforestation, and pollution are just a few of the major challenges we face. These issues are interconnected and have a profound impact on our planet and its inhabitants.

Human: What can we do as individuals to make a difference?
Leo: Every action, no matter how small, can make a difference. We can make conscious choices about our consumption habits, reduce our waste, and support sustainable businesses. We can also raise awareness about environmental issues and advocate for change.

Human: What role can storytelling play in addressing environmental challenges?
Leo: I believe that storytelling is one of the most powerful tools we have to raise awareness and inspire action. Films can transport us to different parts of the world and show us the impact of our choices on the planet. They can also give us hope and inspiration for the future.

Human: What are your hopes for the future of our planet?
Leo: I hope that we can come together as a global community to address the environmental challenges we face. I believe that we have the ingenuity and the resources to create a more sustainable and equitable future for all.
`;

interface CompanionFormProps {
    initialData: Companion | null
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    description: z.string().min(1, {message: "Description is required"}),
    instructions: z.string().min(50, {message: "Instructions is required with at least 50 characters"}),
    seed: z.string().min(150, {message: "Seed is required with at least 150 character"}),
    src: z.string().min(1, {message: "Image is required"}),
    categoryId: z.string().min(1, {message: "Category is required"}),
})

const CompanionForm = ({categories, initialData}: CompanionFormProps) => {

    const {toast} = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
       console.log(values) 
       try {
        if(initialData){
            // Update functionality
            await axios.patch(`/api/companion/${initialData.id}`, values)
        } else {
            // Creating companion functionality
            await axios.post('/api/companion', values)
        }

        toast({
            title: "Success",
            description: "Your companion has been created",
            variant: "default"
        })

        router.refresh()
        router.push('/')
       } catch (error) {
        toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive"
        })
         }


    }

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
        <Form
        {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10" >
                <div className="space-y-2 w-full ">
                    <div>
                        <h3 className="text-lg font-medium">
                            General Information
                        </h3>
                        <p className="text-sm text-muted-foreground">General Information about your Person</p>
                    </div>

                    <Separator className="bg-primary/10"/>
                </div>
{/* Image */}
                <FormField 
                name="src"
                render={({field}) => (
                    <FormItem className="flex flex-col items-center justify-center space-y-4 ">
                        <FormControl>
                            <ImageUpload disabled={isLoading}
                            onChange={field.onChange}
                            value={field.value}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
{/* Name Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField 
                        name="name"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isLoading}
                                    placeholder="Leonardo DiCaprio"
                                    {...field}
                                    />
                                </FormControl>
                                    <FormDescription>
                                        The name of your Personify AI
                                    </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
{/* Description input */}
                         <FormField 
                        name="description"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={isLoading}
                                    placeholder="Academy Award winning American actor"
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    A short description of your Personify AI
                                    </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
        {/* Category select */}
                        <FormField 
                        name="categoryId"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-background ">
                                            <SelectValue placeholder="Select a category" defaultValue={field.value} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>Select a category for your Personify AI</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <div className="space-y-2 w-full ">
                        <div>
                            <h3 className="text-lg font-medium">
                                Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">Instructions for your Personify AI behavior</p>
                        </div>

                        <Separator className="bg-primary/10"/>
                    </div>
 {/* Instructions */}
                        <FormField 
                        name="instructions"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Textarea
                                    className="bg-background resize-none"
                                    rows={7} 
                                    disabled={isLoading}
                                    placeholder={PREAMBLE}
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your Personify AI backstory and relevant information.
                                    </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
    {/* Chat Example */}
                        <FormField 
                        name="seed"
                        control={form.control}
                        render={({field}) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Example Chat</FormLabel>
                                <FormControl>
                                    <Textarea
                                    className="bg-background resize-none"
                                    rows={9} 
                                    disabled={isLoading}
                                    placeholder={SEED_CHAT}
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your Personify AI backstory and relevant information.
                                    </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <div className="w-full flex justify-center">
                            <Button size={"lg"} disabled={isLoading}>
                                <PenSquare  className="mr-2 w-5 h-5 "/>
                                {initialData ? "Edit your Personify AI" : "Create your Personify AI"}
                            </Button>
                        </div>
            </form>
        </Form>
    </div>
  )
}

export default CompanionForm

