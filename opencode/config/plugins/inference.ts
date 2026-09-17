import type { Plugin } from "@opencode-ai/plugin"

const openAICodexProviderIDs = new Set(
  process.env.AGENTZ_OPENAI_CODEX_PROVIDER_IDS?.split(",") ?? []
)
const openAICodexPoolIDs = new Set(process.env.AGENTZ_OPENAI_CODEX_POOL_IDS?.split(",") ?? [])

export default (async () => ({
  async "chat.params"(input, output) {
    if (
      openAICodexProviderIDs.has(input.model.providerID) ||
      openAICodexPoolIDs.has(`${input.model.providerID}/${input.model.id}`)
    ) {
      output.maxOutputTokens = undefined
    }
  },
})) satisfies Plugin
