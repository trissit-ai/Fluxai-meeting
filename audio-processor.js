// AudioWorklet 处理器：抓麦克风的原始 PCM Float32 样本，发回主线程
class PCMCaptureProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0]
    if (input && input[0] && input[0].length > 0) {
      // 必须复制，因为 input buffer 会被复用
      const copy = new Float32Array(input[0])
      this.port.postMessage(copy)
    }
    return true
  }
}

registerProcessor('pcm-capture', PCMCaptureProcessor)