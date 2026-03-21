"use client";

import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/types/task";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeComponent from "./nodes/NodeComponent";
import { useCallback, useEffect } from "react";
import { AppNode } from "@/types/appNode";

const nodeTypes = {
  FluidScrappingNode: NodeComponent,
};

const snapGrid: [number, number] = [50, 50];
const fitViewOptions = { padding: 1.2 };

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) return;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      const { x, y, zoom } = flow.viewport || { x: 0, y: 0, zoom: 1 };
      setViewport({ x, y, zoom });
    } catch (error) {
      console.error("Error parsing workflow definition:", error);
    }
  }, [workflow.definition, setViewport, setNodes, setEdges]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskType = e.dataTransfer.getData("application/reactflow");
    if (typeof taskType === "undefined" || !taskType) return;

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes((nds) => nds.concat(newNode));
  }, []);

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        fitView
        // ---- comment the fitView to restore the viewport to the last saved position and zoom level
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Controls position="top-right" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}

export default FlowEditor;
