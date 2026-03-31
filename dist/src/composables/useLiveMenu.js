/**
 * 直播菜单 Composable
 * 管理直播菜单的状态和操作
 */
import { computed, reactive, ref } from 'vue';
/**
 * 使用直播菜单
 * @returns 直播菜单状态和方法
 */
export function useLiveMenu() {
    const state = reactive({
        visible: false,
        groupIndex: 0,
        column: 'group',
        groups: [
            { label: '央视频道', items: ['内容稍后添加'] },
            { label: '卫视频道', items: ['内容稍后添加'] }
        ],
        itemIndices: [0, 0]
    });
    const currentChannel = ref('');
    const currentPluginId = ref('');
    const currentPluginConfig = ref({});
    const currentGroup = computed(() => state.groups[state.groupIndex]);
    const currentItemIndex = computed(() => state.itemIndices[state.groupIndex] ?? 0);
    const currentItems = computed(() => currentGroup.value?.items ?? []);
    const heading = computed(() => currentChannel.value || currentGroup.value?.label || '');
    /**
     * 切换菜单显示/隐藏
     */
    function toggle() {
        state.visible = !state.visible;
        if (!state.visible) {
            state.column = 'group';
        }
    }
    /**
     * 关闭菜单
     */
    function close() {
        state.visible = false;
        state.column = 'group';
    }
    /**
     * 移动组
     * @param offset 偏移量
     */
    function moveGroup(offset) {
        const total = state.groups.length;
        state.groupIndex = (state.groupIndex + offset + total) % total;
    }
    /**
     * 移动项目
     * @param offset 偏移量
     */
    function moveItem(offset) {
        const items = currentItems.value;
        const total = items.length;
        const nextIndex = (currentItemIndex.value + offset + total) % total;
        state.itemIndices[state.groupIndex] = nextIndex;
    }
    /**
     * 同步频道选择
     * @param channelName 频道名称
     */
    function syncChannel(channelName) {
        if (!channelName)
            return;
        const normalized = channelName.trim();
        currentChannel.value = normalized;
        const groupIndex = state.groups.findIndex(g => g.items.includes(normalized));
        if (groupIndex === -1)
            return;
        const itemIndex = state.groups[groupIndex].items.indexOf(normalized);
        state.groupIndex = groupIndex;
        state.itemIndices[groupIndex] = itemIndex;
    }
    /**
     * 应用菜单组数据
     * @param data 菜单数据
     */
    function applyGroups(data) {
        const cctv = data.央视频道?.length ? data.央视频道 : ['内容稍后添加'];
        const satellite = data.卫视频道?.length ? data.卫视频道 : ['内容稍后添加'];
        state.groups = [
            { label: '央视频道', items: cctv },
            { label: '卫视频道', items: satellite }
        ];
        state.itemIndices = state.groups.map(() => 0);
        state.groupIndex = 0;
        syncChannel(data.currentChannel ?? '');
    }
    /**
     * 切换列
     */
    function switchColumn() {
        state.column = state.column === 'group' ? 'item' : 'group';
    }
    return {
        state,
        currentChannel,
        currentPluginId,
        currentPluginConfig,
        currentGroup,
        currentItemIndex,
        currentItems,
        heading,
        toggle,
        close,
        moveGroup,
        moveItem,
        syncChannel,
        applyGroups,
        switchColumn
    };
}
