import { SingleColumnPage } from "../../components/layout/pages"
import { Button, Container, Heading, toast } from "@medusajs/ui"
import { sdk } from "../../lib/client"

type Response = { message: string }

export const CustomFeaturePage = () => {
    // GET ボタン押下時のハンドラ

    const handleGet = async () => {
        try {
            const data = (await sdk.client.fetch(`admin/custom`)) as Response
            toast.success(`GET: ${data.message}`)
            console.log(data)
        } catch (e: any) {
            toast.error(`GET failed: ${e.message}`)
        }
    }

    // POST ボタン押下時のハンドラ
    const handlePost = async () => {
        try {
            const data = (await sdk.client.fetch(`admin/custom`, {
                method: "POST",
                body: { any: "payload" },
            })) as Response
            toast.success(`POST: ${data.message}`)
            console.log(data)
        } catch (e: any) {
            toast.error(`POST failed: ${e.message}`)
        }
    }

    return (
        <SingleColumnPage
            widgets={{ before: [], after: [] }}
        >
            <Container className="divide-y p-0">
                <div className="flex items-center justify-between px-6 py-4">
                    <Heading level="h2">This is admin page</Heading>
                    <div className="flex gap-2">
                        <Button size="small" variant="secondary" onClick={handleGet}>
                            Call GET
                        </Button>
                        <Button size="small" variant="primary" onClick={handlePost}>
                            Call POST
                        </Button>
                    </div>
                </div>
            </Container>
        </SingleColumnPage>
    )
}