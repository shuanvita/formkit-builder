<script setup lang="ts">
import Palette from '@/components/Palette.vue'
import Canvas from '@/components/Canvas.vue'
import PropertiesPanel from '@/components/PropertiesPanel.vue'
import Preview from '@/components/Preview.vue'
import SchemaIO from '@/components/SchemaIO.vue'
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1>FormKit Builder</h1>
      <span class="app__subtitle">Drag fields → configure → preview → export</span>
    </header>

    <main class="app__main">
      <Palette />
      <div class="app__center">
        <Canvas />
        <Preview />
      </div>
      <PropertiesPanel />
    </main>

    <SchemaIO />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  color: #0f172a;
}
.app__header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 10px 20px;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
}
.app__header h1 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}
.app__subtitle {
  font-size: 12px;
  color: #64748b;
}
.app__main {
  flex: 1;
  display: flex;
  min-height: 0;
}
.app__center {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
</style>
