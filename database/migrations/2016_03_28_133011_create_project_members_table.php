<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_members', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned();
            $table->foreign('project_id')->references('id')->on('projects')->update('cascade');
            $table->integer('member_id')->unsigned();
            $table->foreign('member_id')->references('id')->on('users')->update('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_members', function($table){
            $table->dropForeign('project_members_project_id_foreign');
            $table->dropForeign('project_members_member_id_foreign');
        });
        Schema::drop('project_members');
    }
}
