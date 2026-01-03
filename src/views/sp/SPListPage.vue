<template>
  <div>
    <n-data-table
      :loading="isLoadingSPList"
      :columns="columns"
      :data="data.spList"
      :pagination="data.pagination"
      @update-page="onUpdatePage"
      @update-page-size="onUpdatePageSize"
    ></n-data-table>
  </div>
</template>

<script setup lang="ts">
import { type DataTableColumns, NDataTable, type PaginationProps } from 'naive-ui';
import { onMounted, reactive, ref } from 'vue';
import { ListServiceProvider } from '@/api';
import type { ServiceProvider } from '@/types';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

const isLoadingSPList = ref(false);
const data = reactive({
  pagination: {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    itemCount: 10000,
    showSizePicker: true,
    pageSizes: [20, 50, 100],
  } as PaginationProps,
  spList: [] as ServiceProvider[],
});

const columns: DataTableColumns<ServiceProvider> = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: '服务名称',
    key: 'name',
  },
  {
    title: '服务描述',
    key: 'description',
  },
  {
    title: '重定向URI',
    key: 'redirect_uri',
  },
  {
    title: '更新时间',
    key: 'updated_at',
  },
];

const onUpdatePage = (page: number): void => {
  data.pagination.page = page;
  fetchSPList();
};

const onUpdatePageSize = (pageSize: number): void => {
  data.pagination.pageSize = pageSize;
  fetchSPList();
};

const fetchSPList = async () => {
  isLoadingSPList.value = true;

  data.spList = [];
  const page = data.pagination.page || DEFAULT_PAGE;
  const pageSize = data.pagination.pageSize || DEFAULT_PAGE_SIZE;
  const resp = await ListServiceProvider(page, pageSize);

  data.spList = resp.data.sp_list || [];
  data.pagination.itemCount = resp.data.total || 0; // FIXME not work

  isLoadingSPList.value = false;
};

onMounted(async () => {
  fetchSPList();
});
</script>
