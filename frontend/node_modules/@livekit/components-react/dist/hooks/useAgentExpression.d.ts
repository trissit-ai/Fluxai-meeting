import { UseTranscriptionsOptions } from './useTranscriptions';
import { TextStreamData } from '@livekit/components-core';
/**
 * @beta
 * Published per transcript segment by Expressive Mode: the segment's leading delivery tag.
 **/
export declare const EXPRESSION_ATTRIBUTE: 'lk.expression';
/**
 * @beta
 * The agent's normalized emotional delivery.
 *
 * The wording the TTS provider emits is not a fixed vocabulary: Fish Audio emits single words
 * from a closed set, Inworld emits free-form English ("soft, with genuine care"), and models
 * routinely drift outside whichever set they were given. The agent normalizes that wording to this
 * enum before publishing it, so every client SDK reads the same values.
 */
export type AgentMood = 'excited' | 'happy' | 'playful' | 'curious' | 'surprised' | 'hopeful' | 'empathetic' | 'sad' | 'angry' | 'anxious' | 'calm';
/**
 * @beta
 * How many agent turns an expression survives before the mood decays back to null. Without decay,
 * one excited sentence would leave the UI excited for the rest of the session.
 */
export declare const DEFAULT_MOOD_TTL_TURNS = 2;
/**
 * @beta
 */
export interface UseAgentExpressionReturn {
    /** The normalized mood, or null when the agent hasn't expressed anything recently. */
    mood: AgentMood | null;
    /** The provider's own delivery wording behind the mood, verbatim and free-form. */
    expression: string | null;
}
/**
 * @beta
 * The expression published on a transcript segment, or null when it carries none.
 */
export declare function parseExpression(segment: TextStreamData): UseAgentExpressionReturn | null;
/**
 * @beta
 */
export interface UseAgentExpressionOptions extends UseTranscriptionsOptions {
    /**
     * Agent turns an expression survives before the mood decays to null. `0` disables decay.
     * @defaultValue 2
     */
    ttlTurns?: number;
}
/**
 * @beta
 * useAgentExpression returns the agent's current emotional delivery, as published by Expressive Mode.
 *
 * Reads the transcript stream the session already subscribes to, so it adds no second text stream
 * handler. The mood decays back to null after `ttlTurns` agent turns without a new expression, so
 * a feeling doesn't outlive the moment that produced it.
 *
 * @example
 * ```tsx
 * const { mood, expression } = useAgentExpression();
 * return <span title={expression ?? undefined}>{mood ?? 'neutral'}</span>;
 * ```
 */
export declare function useAgentExpression(opts?: UseAgentExpressionOptions): UseAgentExpressionReturn;
//# sourceMappingURL=useAgentExpression.d.ts.map