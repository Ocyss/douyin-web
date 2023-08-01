<template>
    <el-tree ref="treeRef" :data="data" :props="defaultProps" :accordion="false" default-expand-all
        @node-click="handleNodeClick" :current-node-key="curKey" :highlight-current="false" node-key="index" :indent="13" />
</template>

<script lang="ts" setup>
import { throttle } from '@vavt/util';
import { type HeadList } from 'md-editor-v3';
import bus from '@/utils/event-bus';
import { getRelativeTop, mdHeadingId } from '@/utils';
import { ElTree } from 'element-plus';
const treeRef = ref<InstanceType<typeof ElTree> | undefined>(void 0)
const catalog = inject<Ref<Catalog[]>>("catalog")
const scrollElementRef = inject<Ref<HTMLElement | undefined>>("scrollElement")
const editorId = "douyin"
const offsetTop = 20
const curKey = ref(0)
interface Catalog {
    text: string,
    level: number,
}

interface Tree {
    index: number,
    text: string,
    level: number,
    children?: Tree[]
}

const defaultProps = {
    children: 'children',
    label: 'text',
}
const handleNodeClick = (data: Tree) => {
    // console.log(data)
    const id = mdHeadingId(data.text, data.level, data.index);
    const targetHeadEle = document.getElementById(id);
    const scrollContainer = scrollElementRef?.value
    if (targetHeadEle && scrollContainer) {
        let par = targetHeadEle.offsetParent as HTMLElement;
        let offsetTop = targetHeadEle.offsetTop;
        // 滚动容器包含父级offser标准元素
        if (scrollContainer.contains(par)) {
            while (par && scrollContainer != par) {
                // 循环获取当前对象与相对的top高度
                offsetTop += par?.offsetTop;
                par = par?.offsetParent as HTMLElement;
            }
        }
        scrollContainer?.scrollTo({
            top: offsetTop - 70,
            behavior: 'smooth'
        });
    }
}
const data = computed<Tree[]>(() => {
    const tocItems: Tree[] = [];
    if (!catalog) {
        return tocItems
    }
    catalog.value.forEach((listItem, index) => {
        const { text, level } = listItem;
        const item = {
            level,
            text,
            index: index + 1,
        };
        if (tocItems.length === 0) {
            // 第一个 item 直接 push
            tocItems.push(item);
        } else {
            let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item
            if (item.level > lastItem.level) {
                // item 是 lastItem 的 children
                for (let i = lastItem.level + 1; i <= 6; i++) {
                    const { children } = lastItem;
                    if (!children) {
                        // 如果 children 不存在
                        lastItem.children = [item];
                        break;
                    }
                    lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item
                    if (item.level <= lastItem.level) {
                        // item level 小于或等于 lastItem level 都视为与 children 同级
                        children.push(item);
                        break;
                    }
                }
            } else {
                // 置于最顶级
                tocItems.push(item);
            }
        }
    });

    return tocItems;
})

const findActiveHeading = throttle((list: Catalog[] | undefined) => {
    if (!catalog) {
        return false
    }
    if (!list || list.length === 0) {
        catalog.value = [];
        return false;
    }
    // 获取标记当前位置的目录
    const { index } = list.reduce(
        (activeData, link, index) => {
            const linkEle = document.getElementById(
                mdHeadingId(link.text, link.level, index + 1)
            );
            if (linkEle instanceof HTMLElement) {
                const scrollElement = scrollElementRef?.value;
                // 获得当前标题相对滚动容器视窗的高度
                const relativeTop = getRelativeTop(linkEle, scrollElement);
                // 当前标题滚动到超出容器的顶部且相比其他的标题最近
                if (relativeTop < offsetTop && relativeTop > activeData.minTop) {
                    return {
                        activeHead: link,
                        index: index + 1,
                        minTop: relativeTop
                    };
                }
            }

            return activeData;
        },
        {
            activeHead: list[0],
            index: 1,
            minTop: Number.MIN_SAFE_INTEGER
        }
    );
    // console.log(activeHead, index);

    // activeItem.value = activeHead;
    treeRef.value!.setCurrentKey(index, true)
    // curKey.value = index
    // console.log(treeRef.value!.getCurrentNode());
    // treeRef.value!.broadcastExpanded(node)
    catalog.value = list;
});


const scrollHandler = () => {
    findActiveHeading(catalog?.value);
};

onMounted(() => {
    const scrollElement = scrollElementRef?.value;
    // 滚动区域为document.documentElement需要把监听事件绑定在window上
    scrollElement?.addEventListener('scroll', scrollHandler);

    bus.on(editorId, {
        name: 'catalogChanged',
        callback: (_list: Array<HeadList>) => {
            findActiveHeading(_list);
        }
    });

    // 主动触发一次接收
    bus.emit(editorId, 'pushCatalog');
});


onBeforeUnmount(() => {
    // 要移除监听事件，特别是全局的
    const scrollElement = scrollElementRef?.value;
    // 滚动区域为document.documentElement需要把监听事件绑定在window上
    (scrollElement === document.documentElement
        ? window
        : scrollElement
    )?.removeEventListener('scroll', scrollHandler);
});
</script>

<style lang="scss" scoped>
.el-tree {
    font-size: 17px;
    --el-tree-node-hover-bg-color: "" !important;
    color: rgba(255, 255, 255, 0.6);


    :deep(.is-current) {
        &>.el-tree-node__content>.el-tree-node__label {
            color: rgba(255, 255, 255, 1);

            &::after {
                content: "🤡";
                font-size: 12px;
            }
        }
    }
}
</style>
