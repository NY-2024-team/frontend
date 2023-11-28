<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    interface ModalOverlayEventDispatcher {
        clickOverlay: null
    }
    const dispatch = createEventDispatcher<ModalOverlayEventDispatcher>();

    function handleClickOverlay(event: MouseEvent) {
        dispatch('clickOverlay');
    }
</script>

<div aria-hidden="true" on:click={handleClickOverlay} class="modal_overlay" >
    <slot />
</div>

<style lang="scss">
    .modal_overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        
        width: 100vw;
        height: 100vh;

        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>