import React, { useEffect, useRef, useState } from 'react'; 
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import 'styles/WorkflowLogViewer.css';
import { fetchWorkflowLog, subscribeToWorkflowUpdates } from 'services/workflowService';
import { fetchApiLog } from 'services/logService';

const initialTaskStatuses = {
  Task_ApproveUser: 'completed',
  Task_SendEmail: 'error',
  Task_ValidateEmail: 'inprogress',
  Task_BackupServer: 'completed',
  Task_SecurityScan: 'error',
  Task_UpdateDNS: 'inprogress',
  Task_NotifyAdmin: 'completed',
  Task_PerformAudit: 'inprogress',
  Task_RestartService: 'error',
  Task_FinalizeDeployment: 'completed'
};

const statusColors = {
  completed: '#C8E6C9',
  error: '#FFCDD2',
  inprogress: '#FFF9C4'
};

const WorkflowLogViewer = ({ processInstanceId }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskLog, setTaskLog] = useState('');
  const [taskStatuses, setTaskStatuses] = useState(initialTaskStatuses);
  const stompClientRef = useRef(null);

  // Load BPMN once when mounted
  useEffect(() => {
    const loadDiagram = async () => {
      if (!containerRef.current || viewerRef.current) return;

      const viewer = new BpmnViewer({ container: containerRef.current });
      viewerRef.current = viewer;

      try {
        const workflowLogResponse = await fetchWorkflowLog(processInstanceId);
        const bpmnXml = workflowLogResponse?.bpmnXml;

        if (typeof bpmnXml === 'string' && bpmnXml.trim().length > 0) {
          await viewer.importXML(bpmnXml);
        } else {
          console.error("Invalid or empty BPMN XML:", bpmnXml);
          return;
        }

        const canvas = viewer.get('canvas');
        canvas.zoom('fit-viewport');

        const elementRegistry = viewer.get('elementRegistry');

        Object.entries(taskStatuses).forEach(([taskId, status]) => {
          const element = elementRegistry.get(taskId);
          if (element) {
            canvas.addMarker(taskId, status);

            const gfx = elementRegistry.getGraphics(taskId);
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.textContent = 'Click to view API logs';
            label.setAttribute('x', 10);
            label.setAttribute('y', 70);
            label.setAttribute('font-size', '10px');
            label.setAttribute('fill', '#0000ee');
            label.setAttribute('style', 'cursor: pointer; text-decoration: underline;');
            label.setAttribute('class', 'bpmn-log-link');

            label.addEventListener('click', async () => {
              const logData = await fetchApiLog(processInstanceId, taskId);
              setSelectedTask(taskId);
              setTaskLog(logData);
            });

            gfx.appendChild(label);
          }
        });
      } catch (error) {
        console.error("Error loading BPMN diagram:", error);
      }
    };

    loadDiagram();
  }, [processInstanceId, taskStatuses]);

  // WebSocket connection via service layer
  useEffect(() => {
    const subscription = subscribeToWorkflowUpdates(
      processInstanceId,
      (taskId, status) => {
        setTaskStatuses(prev => ({
          ...prev,
          [taskId]: status
        }));

        const canvas = viewerRef.current?.get('canvas');
        if (canvas && taskId && status) {
          Object.keys(statusColors).forEach(color => {
            canvas.removeMarker(taskId, color);
          });
          canvas.addMarker(taskId, status);
        }
      },
      (client) => {
        stompClientRef.current = client;
      }
    );

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        console.log('WebSocket disconnected');
      }
    };
  }, [processInstanceId]);

  return (
    <div className="viewer-container">
      <div className="diagram" ref={containerRef}></div>
      {selectedTask && (
        <div className="log-panel">
          <h3>Logs for {selectedTask}</h3>
          <pre className="log-text">{taskLog}</pre>
        </div>
      )}
    </div>
  );
};

export default WorkflowLogViewer;
