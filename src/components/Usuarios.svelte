<script>
  import { onMount } from "svelte";
  import { loader } from "../stores/loader.js";
  import { fetchUsers } from "../services/apiService.js";
  import Spinner from "./Spinner.svelte";

  let users = [];

  onMount(async () => {
    users = await fetchUsers();
  });
</script>


<div class="col-md-12">
{#if $loader}
  <div class="d-flex justify-content-center">
    <Spinner />
  </div>
{:else}
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
</div>  