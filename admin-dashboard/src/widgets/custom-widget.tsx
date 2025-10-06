import { Container, Heading, Text, Button } from "@medusajs/ui"
  import { useState } from "react"

  interface CustomWidgetProps {
    data?: any // 詳細ページの場合、該当データが渡される
  }

  export const CustomWidget = ({ data }: CustomWidgetProps) => {
    const [count, setCount] = useState(0)

    return (
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex flex-col gap-y-1">
            <Heading level="h2">カスタムウィジェット</Heading>
            <Text className="text-ui-fg-subtle">
              これは独自に追加したウィジェットです
            </Text>
          </div>
          <div className="flex items-center gap-x-2">
            <Button 
              variant="secondary" 
              size="small"
              onClick={() => setCount(count + 1)}
            >
              クリック: {count}
            </Button>
            <Button variant="primary" size="small">
              アクション
            </Button>
          </div>
        </div>

        {/* データが渡された場合の表示 */}
        {data && (
          <div className="px-6 py-4">
            <Text className="text-ui-fg-subtle">
              関連データID: {data.id}
            </Text>
          </div>
        )}
      </Container>
    )
  }
