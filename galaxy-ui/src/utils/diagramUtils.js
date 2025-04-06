export const cleanUpBpmnViewer = (containerElement) => {
    // Remove the bpmn.io watermark
    const logo = containerElement?.querySelector('a[data-original-title="bpmn.io"]');
    if (logo) logo.remove();
  
    // Remove default label like "Process_1"
    const textElements = containerElement?.querySelectorAll('text');
    textElements?.forEach(el => {
      const text = el.textContent?.trim();
      if (text === 'Process_1') {
        el.remove();
      }
    });
  };
  